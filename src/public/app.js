function generateChart(chartIdElement, arrLabels, objDataset) {
  let ctxt = document.getElementById(chartIdElement).getContext('2d');
  let chart = new Chart(ctxt, {
    type: 'line',
    data: {
      labels: arrLabels,
      datasets: [objDataset]
    }
  });
}
//'chartMaleFemale'