function majAffichage(noCarte){
	switch(etatsCartes[noCarte]){
		case 0:
			imgCartes[noCarte].src="fondcarte.png";
			break;
		case 1:
			imgCartes[noCarte].src="carte"+motifsCartes[noCarte]+".png";
			break;
		case -1:
			imgCartes[noCarte].style.visibility="hidden";
			break;
	}
}

function rejouer(){
	alert("Bravo !");
	location.reload();
}


function initialiseJeu(){
	for(var position=motifsCartes.length-1; position>=1; position--){
		var hasard=Math.floor(Math.random()*(position+1));
		var sauve=motifsCartes[position];
		motifsCartes[position]=motifsCartes[hasard];
		motifsCartes[hasard]=sauve;
	}
}