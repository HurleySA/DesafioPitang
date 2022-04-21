const { exec } = require('child_process');
const crypto = require('crypto');
const { config } = require('dotenv');
const util = require('util');


const prismaBinary = '.\\node_modules\\.bin\\prisma'

module.exports =  async () => {
  console.info('\nMontando suíte de testes...')

  config({ path: '.env.test' })

  const execSync = util.promisify(exec)

  global.__SCHEMA__ = `test_${crypto.randomUUID()}`

  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${global.__SCHEMA__}`

  await execSync(`${prismaBinary} migrate deploy`)

  console.info('Suíte pronta. Iniciando testes...\n')
}

