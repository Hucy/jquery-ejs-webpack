// https://github.com/shelljs/shelljs
// require('shelljs/global')
// env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
// var ora = require('ora')
// var webpack = require('webpack')
// var webpackConfig = require('./webpack.prod.conf')
var chalk =require('chalk')
var inquirer=require('inquirer')
var Listr =require('listr')
var build = require('./build')
/**
 * 获取文件路径
 */
  var assetsPath = path.join(config.build.assetsRoot);
  var staticTargetPath=path.join(assetsPath.split('workflow')[0],'www/')
  var htmlTargetPath=path.join(assetsPath.split('workflow')[0],'Zend/application/modules/','testpub','views/scripts/','/testsub/')
  var htmlpath=[]
/**
 * 打印消息
 * 
 */
try{
  build(filesHandler)
}catch(e){
  console.log(e)
}

function filesHandler(){
  console.log(chalk.cyan(
  '  Deployed to the test server  \n'+
  '  Your file will be operated: \n'
))
  var filesList=ls('-R',assetsPath).filter(function(file) { 
  var targetpath =staticTargetPath
  if(/\.html$/.test(file)){
    targetpath=htmlTargetPath
    htmlpath.push(path.join(assetsPath,file))
  }
  console.log('   '+file+'  >>>>>>>>>>>>>>>>  '+path.join(targetpath,file))
  return file
});
if (filesList.length) {
  inquirer.prompt([{
              type: 'confirm',
              message:"Continue" ,
              name: 'ok'
            }]).then((answers)=>{
              if(answers.ok){
                runtask()
              }
                else{
                console.log(chalk.red('   Operation is not allowed'))
              }
    })
          }else{
            console.log(chalk.red('  run build first'))
          }
}


var tasks = new Listr([
    {
        title: 'Copy files',
        task: () => {
          try{
            cp('-Rf',assetsPath+'/css',staticTargetPath)
            cp('-Rf',assetsPath+'/js',staticTargetPath)
            cp('-Rf',htmlpath,htmlTargetPath)
            rm('-rf', assetsPath);
          }catch(e){
            throw e
        }
          }
    },
    {
        title: 'Can be skipped',
        skip: () => {
            if (Math.random() > 0.5) {
                return 'Reason for skipping';
            }
        },
        task: () => 'Bar'
    },
    {
        title: 'Task 3',
        task: () => Promise.resolve('Bar')
    }
]);
function runtask(){
  console.log(chalk.cyan('  task starting... \n'))
  tasks.run().catch(err => {
    console.error(err);
});
}

