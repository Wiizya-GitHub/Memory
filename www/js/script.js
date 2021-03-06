var motifsCartes=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
var etatsCartes=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
var cartesRetournees=[];
var nbPairesTrouvees=0;
var imgCartes=document.getElementById("tapis").getElementsByTagName("img");
var nbErreur = 0;
var erreurAuto = 20;	

for(var i=0;i<imgCartes.length;i++){
	imgCartes[i].noCarte=i; //Ajout de la propriété noCarte à l'objet img
	imgCartes[i].onclick=function(){
		controleJeu(this.noCarte);
	}                      
}

$(document).ready(function() {
    $("button").click(function() {
        location.reload(true);
    });
	$('.score').text(' 0 ');
	$('.erreurAuto').text(' / ' + erreurAuto);
});

initialiseJeu();

function majAffichage(noCarte){
	switch(etatsCartes[noCarte]){
		case 0:
			imgCartes[noCarte].src="image/fondcarte.png";
			nbErreur = nbErreur + 0.5;
			$('.score').text(nbErreur);
			if (nbErreur == erreurAuto) {
				$('#tapis').addClass('perdu').text('Perdu');
				$('.scoreboard').addClass('hidden');
				$('#button').removeClass('hidden');
			}
			break;
		case 1:
			imgCartes[noCarte].src="image/carte_"+motifsCartes[noCarte]+".png";
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

function controleJeu(noCarte){
    if(cartesRetournees.length<2){
        if(etatsCartes[noCarte]==0){
			etatsCartes[noCarte]=1;
			cartesRetournees.push(noCarte);
			majAffichage(noCarte);
		}
        if(cartesRetournees.length==2){
			var nouveauEtat=0;
			if(motifsCartes[cartesRetournees[0]]==motifsCartes[cartesRetournees[1]]){
				nouveauEtat=-1;
				nbPairesTrouvees++;
			}

			etatsCartes[cartesRetournees[0]]=nouveauEtat;
			etatsCartes[cartesRetournees[1]]=nouveauEtat;
            setTimeout(function(){
				majAffichage(cartesRetournees[0]);
				majAffichage(cartesRetournees[1]);
				cartesRetournees=[];
				if(nbPairesTrouvees==10){
					rejouer();
				}
			},750);
		}
	}
}