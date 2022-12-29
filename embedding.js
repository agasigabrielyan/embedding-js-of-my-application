if( typeof eventsToBeUsed == "undefined" ) {
    let eventsToBeUsed = [
        'CrmProgressControlAfterSaveSucces',
        "Crm.EntityProgress.onSaveBefore",
        "Crm.EntityModel.Change"
    ];

    for (let i=0; i<eventsToBeUsed.length; i++) {
        BX.addCustomEvent(eventsToBeUsed[i], BX.delegate(function(data){
            debugger;
            let identifier = 0;
            if( eventsToBeUsed[i] === 'Crm.EntityModel.Change' ) {
                console.log('Событие');
                debugger;
                identifier = data.eventParams[1].entityId;
            } else {
                console.log('События');
                debugger;
                identifier = data._entityId;
            }

            if(data._currentStepId === "C58:WON") {
                let someData = {};
                someData['ACTION'] = 'SAVE_PROGRESS';
                someData['VALUE'] = "C58:WON";
                someData['TYPE'] = 'DEAL';
                someData['ID'] = data._entityId;
                someData['sessid'] = BX.bitrix_sessid();
                BX.ajax({
                    url:"/bitrix/components/bitrix/crm.deal.list/list.ajax.php",
                    data:someData,
                    dataType:'json',
                    method:"POST",
                    onsuccess:function(res){
                        // если указываем dataType: 'json', то в data будет содержаться уже
                        // распарсенный через JSON.parse(data) объект
                        if( res.VALUE !== "C58:WON") {
                            var popup = new BX.PopupWindow(
                                'request-report',
                                null,
                                {
                                    width: 600,
                                    height: 200,
                                    closeByEsc: true,
                                    closeIcon: true,
                                    overlay: {
                                        opacity: 50,
                                        backgroundColor: '#000'
                                    },
                                    events: {
                                        onPopupShow: function() {
                                            // Событие при показе окна
                                        },
                                        onPopupClose: function() {
                                            window.location.reload();
                                        }
                                    },
                                    titleBar: 'Уведомление',
                                    content: '<h3>Необходимо заполнить все поля АСУП</h3>' ,
                                    buttons: [

                                    ]
                                }
                            );

                            popup.show();
                        }
                    },
                    onfailure:function(error){
                        debugger;
                        alert('Произошла ошибка, пожалуйста, обратитесь к администратору портала');
                    }
                });
            }
        }));
    }

}