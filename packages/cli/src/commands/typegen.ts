import * as p from "@clack/prompts"
import type { SystemContext } from "@rechakra/react"
import { Command } from "commander"
import createDebug from "debug"
import { writeFileSync } from "fs"
import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { generateCondition } from "../utils/generate-conditions"
import { generateIsolatedRecipes } from "../utils/generate-isolated-recipes"
import { generateIsolatedTokens } from "../utils/generate-isolated-tokens"
import { generatePropTypes } from "../utils/generate-prop-types"
import { generateRecipe } from "../utils/generate-recipe"
import { generateSystemTypes } from "../utils/generate-system-types"
import { generateTokens } from "../utils/generate-tokens"
import * as io from "../utils/io"
import { tasks } from "../utils/tasks"

const debug = createDebug("chakra:typegen")

const req = createRequire(import.meta.url)

const getDefaultBasePath = () => {
  const cwd = process.cwd()

  if (!process.env.LOCAL) {
    const root = req.resolve("@rechakra/react", { paths: [cwd] })
    return resolve(root, "..", "..", "types", "styled-system", "generated")
  }

  const root = join(cwd, "packages", "react", "src")
  return join(root, "styled-system", "generated")
}

interface CodegenFlags {
  strict?: boolean
  format?: boolean
  watch?: string
  clean?: boolean
  outdir?: string
  isolated?: boolean
}

type ResolvedCodegenFlags = CodegenFlags & { outdir: string }

export const TypegenCommand = new Command("typegen")
  .argument("<source>", "path to the theme file")
  .description("Generate theme and recipe typings")
  .option("--strict", "Generate strict types for props variant and size")
  .option("--watch [path]", "Watch directory for changes and rebuild")
  .option("--clean", "Clean the output directory")
  .option("--outdir <dir>", "Output directory to write the generated types")
  .option(
    "--isolated",
    "Generate augmentation-only typings without touching node_modules",
  )
  .action(async (source: string, flags: CodegenFlags) => {
    debug("source", source)
    debug("flags", flags)

    const cwd = process.cwd()
    const resolvedOutdir =
      flags.outdir ??
      (flags.isolated ? join(cwd, ".chakra") : getDefaultBasePath())
    const options: ResolvedCodegenFlags = { ...flags, outdir: resolvedOutdir }

    if (options.clean) {
      debug("cleaning output directory", options.outdir)
      await io.clean(options.outdir)
    }

    let result = await io.read(source)

    if (process.env.DEBUG) {
      const configPath = resolve("chakra-config.json")
      debug("writing bundled source to", configPath)
      const config = (result as any).mod._config
      writeFileSync("chakra-config.json", JSON.stringify(config, null, 2))
    }

    const build = async () => {
      await codegen(result.mod, options)

      if (options.watch) {
        p.log.info("\n⌛️ Watching for changes...")
      }
    }

    if (!options.watch) {
      await build()
    } else {
      debug("watch dependencies", result.dependencies)
      io.watch(result.dependencies, async () => {
        result = await io.read(source)
        return build()
      })
    }

    p.outro("🎉 Done!")
  })

function codegen(sys: SystemContext, flags: ResolvedCodegenFlags) {
  io.ensureDir(flags.outdir)
  debug("writing codegen to", flags.outdir)

  if (flags.isolated) {
    return tasks([
      {
        title: "Generating isolated token types...",
        task: async () => {
          await io.write(
            flags.outdir,
            "tokens.isolated",
            generateIsolatedTokens(sys),
          )
          return "✅ Generated isolated token typings"
        },
      },
      {
        title: "Generating isolated recipe types...",
        task: async () => {
          await io.write(
            flags.outdir,
            "recipes.isolated",
            generateIsolatedRecipes(sys, flags.strict),
          )
          return "✅ Generated isolated recipe typings"
        },
      },
    ])
  }

  return tasks([
    {
      title: "Generating conditions types...",
      task: async () => {
        await io.write(flags.outdir, "conditions.gen", generateCondition(sys))
        return "✅ Generated conditions typings"
      },
    },
    {
      title: "Generating recipe types...",
      task: async () => {
        await io.write(
          flags.outdir,
          "recipes.gen",
          generateRecipe(sys, flags.strict),
        )
        return "✅ Generated recipe typings"
      },
    },
    {
      title: "Generating utility types...",
      task: async () => {
        await io.write(flags.outdir, "prop-types.gen", generatePropTypes(sys))
        return "✅ Generated utility typings"
      },
    },
    {
      title: "Generating token types...",
      task: async () => {
        await io.write(flags.outdir, "token.gen", generateTokens(sys))
        return "✅ Generated token typings"
      },
    },
    {
      title: "Generating system types...",
      task: async () => {
        await io.write(flags.outdir, "system.gen", generateSystemTypes(sys))
        return "✅ Generated system types"
      },
    },
  ])
}
