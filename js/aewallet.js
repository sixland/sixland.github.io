function Uint8ArrayToHex(arr){
    let s=[];
    arr.forEach(element=>{
        s.push((element>>>4).toString(16));
        s.push((element&0x0f).toString(16));
    });
    return s.join('');
}

function Uint8ArrayToBase58(u8a){
    let ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    const size = (u8a.length * Math.log(256)/Math.log(58)+1) >>> 0;
    let b58 = new Uint8Array(size);
    let length = 0;
    for(let i=0;i<u8a.length;i++){
        let carry = u8a[i];
        let it=0;
        for(let j=size-1; (carry !==0 || it<length) && (j!==-1) ;j--,it++){
            carry+=(256*b58[j])>>>0;
            b58[j] = (carry%58)>>>0;
            carry = (carry/58)>>>0;
        }
        length = it;
    }

    let str = '';
    for(let i=0;i<b58.length;i++){
        str += ALPHABET.charAt(b58[i]);
    }
    return str;
}


setInterval(
    function(){
        //const keyPair = window.nacl.sign.keyPair();
        let d=new Date();
        document.getElementById("demo").innerHTML=d.toLocaleTimeString();
       // document.getElementById('demo1').innerHTML=Uint8ArrayToHex()
    }
        ,1000);

setInterval(() => {
    const keyPair = window.nacl.sign.keyPair();

    const scretKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey;



    document.getElementById('demo1').innerHTML="scretkey: "+Uint8ArrayToHex(scretKey);
    document.getElementById('demo2').innerHTML='publickey: '+ Uint8ArrayToBase58(publicKey);
}, 5000);
