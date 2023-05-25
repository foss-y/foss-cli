
const { program } = require('commander');
const fs = require('node:fs')

// 获取 package.json 中的版本号
const { version } = require('../package.json');
const log = require('./log');

// 命令配置
const { commands } = require('../config');
const path = require('node:path');

class FossEntry {

  // 入口
  init() {
    // 1、打印 logo
    const logoText = fs.readFileSync(path.resolve(__dirname, './banner/banner.txt'), { encoding: 'utf-8' })
    log(logoText)

    // 2、设置版本号
    program.version(version)

    // 3.注册命令
    this.#registerCommand()




    // // 获取用户输入命令
    // program
    //   .version(require('../package.json').version)
    //   .usage('<command> [options]')
    //   .command('create', 'create a new project')
    //   .command('list', 'list all templates')
    //   .command('add', 'add a new template')
    //   .command('delete', 'delete a template')
    //   .parse(process.argv);





    // 设置提示
    // program
    //   .option('-d, --delete <path>', 'delete options from config')


    // end 解析用户输入命令
    program.parse(process.argv)

  }

  #registerCommand() {
    commands.forEach((item) => {
      try {
        program.command(item.name).description(item.description).action(require(`./services/${item.actionFileName}`))
      } catch (err) {
        throw new Error(err)
      }
    })
  }
}

module.exports = new FossEntry();