export function formatting(time){
    let timeA = new Date(time).getTime()
    var time = new Date(timeA);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+repair0(m)+'-'+repair0(d)+' '+repair0(h)+':'+repair0(mm)+':'+repair0(s);
}
function repair0(m){
	return m<10?'0'+m:m 
}