const getChineseNum = function(num) {
  let Cnums = ['一','二','三','四','五','六','七','八','九'];
  let Cnum;
  switch(String(num).length) {
    case 1: 
      Cnum = Cnums[num -1];
      break;
    case 2: 
      Cnum = (Number(String(num).slice(0,1)) > 1 ? Cnums[Number(String(num).slice(0,1)) - 1] : '') + 
      	'十' + (Number(String(num).slice(1,2)) ? Cnums[Number(String(num).slice(1,2)) -1] : '');
      break;
  }
  return Cnum
}

export {
	getChineseNum
}