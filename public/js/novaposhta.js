$(function(){
    var $texts=$('#text_test');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'https://api.novaposhta.ua/v2.0/json/',
        data: JSON.stringify({
          modelName: 'Address',
          calledMethod: 'searchSettlements',
          methodProperties: {
            CityName: 'ки',
            Limit: 555
          },
          apiKey: '75336e05a774dce3a43644d4a2835485'
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        xhrFields: {
          withCredentials: false 
        },
        success: function(texts) {
          console.log(texts);
        },
      });
    });