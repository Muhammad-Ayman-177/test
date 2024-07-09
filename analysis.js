document.addEventListener('DOMContentLoaded', function() {
    fetch('/get-survey-results')
        .then(response => response.json())
        .then(data => {
            const chartsContainer = document.getElementById('chartsContainer');
            data.forEach((question, index) => {
                const canvas = document.createElement('canvas');
                canvas.id = `chart${index}`;
                canvas.classList.add('chart');
                chartsContainer.appendChild(canvas);

                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: question.options,
                        datasets: [{
                            label: question.text,
                            data: question.responses,
                            backgroundColor: 'rgba(0, 123, 255, 0.5)',
                            borderColor: 'rgba(0, 123, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            });
        });
});
