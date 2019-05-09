const getData=function getData() {
	return new Promise((ok, ko) => {
		const xhr=new XMLHttpRequest();
		xhr.open('GET', '/data.json', true);
		xhr.onload=() => ok(JSON.parse(xhr.responseText));
		xhr.onerror=ko;
		xhr.send(null);
	});
};

const colors=[]
colors.push("rgb(54, 162, 235)");
colors.push("rgb(75, 192, 192)");
colors.push("rgb(153, 102, 255)");
colors.push("rgb(255, 159, 64)");

const labels=[]
labels.push(["Nombre de lignes", "de 2 petites cases"]);
labels.push(["Nombre de lignes", "de 2 grandes cases"]);
labels.push(["Nombre de", "grandes cases"]);
labels.push(["Nombre de", "cases contrôlées"]);

const winnerStatsEvolution=function winnerStatsEvolution(data) {
	const canvas=document.querySelector('main canvas');
	
	const datasets=[]
	for(let i=0; i<4; i++) {
		datasets.push({
			label: labels[i].join(" "),
			data: data.map(d => d[0].coef[i]),
			fill: false,
			backgroundColor: colors[i],
			borderColor: colors[i],
			lineTension: 0
		});
	}
	
	return new Chart(canvas, {
		type: 'line',
		data: {
			labels: data.map((a, b) => b+1+''),
			datasets
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Evolution des coefficients du vainqueur des tournois"
			},
			scales: {
				xAxes: [
					{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Etape'
						}
					}
				],
				yAxes: [
					{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Valeur du coefficient'
						}
					}
				]
			}
		}
	});
};

const winnerStatsRadar=function winnerStatsRadar(data) {
	const canvas=document.querySelector('aside canvas');
	
	const dataset={
		data,
		fill: false,
		backgroundColor: colors[0],
		borderColor: colors[0]
	};
	
	return new Chart(canvas, {
		type: 'radar',
		data: {
			labels,
			datasets: [dataset]
		},
		options: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: "Coefficients du meilleur joueur"
			},
			scale: {
				ticks: {
					maxTicksLimit: 5
				},
				gridLines: {
					circular: true
				}
			}
		}
	});
};

window.onload=async () => {
	const data=await getData();
	console.log(data);
	
	winnerStatsEvolution(data);
	winnerStatsRadar(data[data.length-1][0].coef);
};
