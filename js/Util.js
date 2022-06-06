class Util{

	// tipo de datos entrantes -> 0=Cualquier dato ; 1=Cualquier número ; 2=Solo número entero ; 3=Solo número décimal
	static entradaDato(mensaje,tipo=0){
		let entrada;
		let salida;
		let aviso=null;
		do{
			salida=false;
			entrada=prompt(`${mensaje}\n\n${aviso??""}`)??"";
			switch(tipo){
				case 1: salida=Util.esNumero(entrada); aviso="Solo se aceptan números"; break;
				case 2: salida=(Util.esNumero(entrada) && !Util.esDecimal(entrada)); aviso="Solo se aceptan números enteros"; break;
				case 3: salida=Util.esDecimal(entrada); aviso="Solo se aceptan números décimales"; break;
				case 0: salida=true; break;
			}
		}while(!salida);
		return entrada;
	}

	static esNumero(texto){
		texto??=" ";
		if(texto=="" || texto=="."){ return false; }
		if(texto=="0"){ return true; }
		let decimales=0;
		if(texto[0]=="-"){
			texto=texto.replaceAll("-","");
		}
		for(let a=0; a<texto.length; a++){
			if(texto[a]=="."){
				decimales++;
			}else
			if(parseFloat(texto[a]).toString()=="NaN"){
				return false;
			}
			if(decimales>1){
				return false;
			}
		}
		return true;
	}

	static esDecimal(texto){
		if(Util.esNumero(texto)){
			if(texto%1==0){
				return false;
			}
		}else{
			return false;
		}
		return true;
	}

	static numeroAleatorio(max,min=0,cantidad=1){
		if(((max-min)+1)<cantidad){
			return null;
		}
		let numeros=[];
		do{
			let repetido=false;
			let numero=Math.round(Math.random()*(max-min)+min);
			for(let a=0; a<numeros.length; a++){
				if(numeros[a]==numero){
					repetido=true;
					a=numeros.length;
				}
			}
			if(!repetido){
				numeros.push(numero);
			}
		}while(numeros.length<cantidad);
		return (cantidad==1)?numeros[0]:numeros;
	}

}