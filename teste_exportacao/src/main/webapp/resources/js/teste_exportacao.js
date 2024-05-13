var MyWidget = SuperWidget.extend({
    //variáveis da widget
    previsoes: [
        {
            'data': '13/05/2024',
            'min': '18',
            'max': '33'
        },
        {
            'data': '14/05/2024',
            'min': '18',
            'max': '29'
        },
        {
            'data': '15/05/2024',
            'min': '16',
            'max': '27'
        },
        {
            'data': '16/05/2024',
            'min': '15',
            'max': '30'
        },
        {
            'data': '17/05/2024',
            'min': '20',
            'max': '32'
        },
    ],

    //método iniciado quando a widget é carregada
    init: function() {

        for(i in this.previsoes){

            $('#tbPrevisoes').append('<tr><td>'+ this.previsoes[i].data +'</td><td>'+ this.previsoes[i].min +'</td><td>'+this.previsoes[i].max +'</td></tr>');
        }
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'exportar-dados': ['click_exportarDados']
        },
        global: {}
    },
 
    exportarDados: function () {

        var gerarPlanilha = function () {

            // encode
            var universalBOM = "\uFEFF";

            // cabeçalh
            var csv = "DATA;TEMPERATURA MINIMA;TEMPERATURA MAXIMA;\n";

            for (j in this.MyWidget.previsoes) {
                var prev = this.MyWidget.previsoes[j]

                if (!!prev.data) {
                    csv += `${prev.data};`
                } else {
                    csv += "--;"

                }
                if (!!prev.min) {
                    csv += `${prev.min};`
                } else {
                    csv += "--;"

                }
                if (!!prev.max) {
                    csv += `${prev.max};`
                } else {
                    csv += "--;"

                }

                csv += "\n"

                console.log("CSV FINAL: " + csv)
            }

            if (this.MyWidget.previsoes.length > 0) {

                var hiddenElement = document.createElement("a");

                hiddenElement.href = "data:text/csv; charset=ISO-8859-1," + encodeURIComponent(universalBOM + csv)
                hiddenElement.target = "_blank";
                hiddenElement.download = "previsoes.csv";
                hiddenElement.click();
                csv = "";

            } else {

                FLUIGC.message.alert({
                    message: "Não foi possível baixar o relatório, não há registros.",
                    title: "Mensagem",
                    label: "OK",
                });

            }
        };
        gerarPlanilha();

    },

});

