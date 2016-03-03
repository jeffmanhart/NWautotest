// exports.command = function(tablePlan, callback) {
//   var client = this;
//   var i = 1;
//   var n = 26;
// //  console.log(client);
//   var shotRoot = 'logs/s' + process.env.__NIGHTWATCH_ENV_KEY + 's';
//   client.useXpath()
//   .waitForElementVisible('//*[@id="content"]/div/div[3]/div/table/tbody',1000, loop(),'[Cpl] Table is visible');
//   function loop(){
//       // while(i < 26){
//       //   if(client.isVisible('//*[@id="content"]/div/div[3]/div/table/tbody/tr[' + i + ']/td[2]/a')){
//       //         client.getText('//*[@id="content"]/div/div[3]/div/table/tbody/tr[' + i + ']/td[2]/a', function(result){
//       //           tablePlan[[i],[0],[0],[0],[0],[0],[0]] = result.value;
//       //           console.log(tablePlan[[i],[0],[0],[0],[0],[0],[0]]);
//       //       });
//       //       } else {
//       //         console.log("End has - " + tablePlan);
//       //         break;
//       //       }
//       //       }
//
//     for(var i = 1; i < n; i++) {
//       // client.isVisible('//*[@id="content"]/div/div[3]/div/table/tbody/tr[' + i + ']/td[2]/a', function(result){
//         if(client.isVisible('//*[@id="content"]/div/div[3]/div/table/tbody/tr[' + i + ']/td[2]/a')){
//           client.getText('//*[@id="content"]/div/div[3]/div/table/tbody/tr[' + i + ']/td[2]/a', function(result){
//             tablePlan[[i],[0],[0],[0],[0],[0],[0]] = result.value;
//             console.log(tablePlan[[i],[0],[0],[0],[0],[0],[0]]);
//
//         }else{
//           console.log("End has - " + tablePlan);
//           n = i++;
//         }
//       });
//       }
//   return this;
// };
