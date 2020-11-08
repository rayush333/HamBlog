exports.f1=getDate;
function getDate(){
return new Date().toLocaleDateString("en-US",{hour: 'numeric',minute: 'numeric',weekday:'long', month:'long',day: 'numeric'});
}
