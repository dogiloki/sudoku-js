class Main{

	constructor(){
		this.tablero=new Tablero();
	}

	pedirNumero(){
		let mensaje="Tamaño del tablero: "+Diccionario.tamanio.tablero;
		mensaje+="\n"+this.tablero.mostrar();
		mensaje+="Ingrese una posición la altura, anchura, número. Separa por comas";
		let posicion=Util.entradaDato(mensaje,0).replaceAll(" ","").split(",");
		let fila=(posicion[0]??"")-1;
		let columna=(posicion[1]??"")-1;
		let numero=(posicion[2]??"");
		if(!this.tablero.ponerNumero(fila,columna,numero)){
			alert("La posición o número no es válido");
		}
		this.pedirNumero();
	}

}