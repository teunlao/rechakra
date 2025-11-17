import * as p from "@clack/prompts"
import { Command } from "commander"
import { writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { generateDesignSystemSchema } from "../utils/generate-lint-schema"
import * as io from "../utils/io"

interface LintSchemaFlags {
  outdir?: string
  isolated?: boolean
}

export const LintSchemaCommand = new Command("lint-schema")
  .argument("<source>", "path to the theme file")
  .description(
    "Generate design-system schema JSON for external linters (tokens, props)",
  )
  .option("--outdir <dir>", "Output directory for schema JSON")
  .option("--isolated", "Mark schema as generated for isolated typegen mode")
  .action(async (source: string, flags: LintSchemaFlags) => {
    const cwd = process.cwd()
    const outdir = flags.outdir ?? resolve(cwd, ".chakra")

    const mode = flags.isolated ? "isolated" : "default"

    const result = await io.read(source)
    const schema = generateDesignSystemSchema(result.mod, mode)

    io.ensureDir(outdir)

    const filePath = join(outdir, "design-system.schema.json")
    await writeFile(filePath, JSON.stringify(schema, null, 2), "utf-8")

    p.outro(`🎉 Schema written to ${filePath}`)
  })
