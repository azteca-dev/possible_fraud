'use strict'

/* App Module */

var module = angular.module('possibleFraud', ['possibleFraudServices', 'possibleFraudFilters']);

module.directive('tabs', function () {
    return {
        restrict:'A',
        link:function (scope, element, attrs) {
            element.tabs();
        }
    };
});

module.directive('regDatePicker', function (Broadcast) {
    return {
        restrict:'A',
        link:function (scope, element, attrs) {
            var datePicker = element.datePicker();

            datePicker.on("select", function () {
                scope[attrs.regDatePicker] = element.val();

                scope.$apply(scope.paginate(1));
            });

            scope[attrs.regDatePicker] = datePicker.today();

            if (scope.regDateFrom != "" && scope.regDateTo != "") {
                scope.paginate(1);
            }
        }
    };
});

module.directive('loadingModal', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict:'E',
        template:'<div></div>',
        link:function (scope, element) {
            var template = $templateCache.get('loading.html');
            var content = $compile(template)(scope);
            var conf = {
                content:content
            }
            var modal = element.modal(conf);

            scope.$on('showLoadingModal', function () {
                modal.show();
            });

            scope.$on('hideLoadingModal', function () {
                modal.hide();
            });
        }
    }
}]);

module.directive('messageModal', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict:'E',
        template:'<div></div>',
        link:function (scope, element) {
            var template = $templateCache.get('message.html');
            var content = $compile(template)(scope);
            var conf = {
                content:content
            }
            var modal = element.modal(conf);

            modal.on('hide', function () {
                scope.messageModal = "";
                scope.messageModalClass = "";
            })

            scope.$on('showMessageModal', function () {
                modal.show();
            });

            scope.$on('hideMessageModal', function () {
                modal.hide();
            });
        }
    }
}]);

module.directive('confirmationModal', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict:'E',
        template:'<div></div>',
        link:function (scope, element) {
            var template = $templateCache.get('confirmation.html');
            var content = $compile(template)(scope);
            var conf = {
                content:content
            }
            var modal = element.modal(conf);

            modal.on('hide', function () {
                scope.confirmationId = "";
                scope.confirmationAction = "";
                scope.confirmationMessage = "";
            })

            scope.$on('showConfirmationModal', function () {
                modal.show();
            });

            scope.$on('hideConfirmationModal', function () {
                modal.hide();
            });
        }
    }
}]);

module.directive('pendingModal', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict:'E',
        template:'<div></div>',
        link:function (scope, element) {
            var template = $templateCache.get('pendingModal.html');
            var content = $compile(template)(scope);

            var conf = {
                content:content,
                height:"90%"
            }
            var modal = element.modal(conf);

            modal.on('hide', function () {
                scope.currentUser = {};
            })

            scope.$on('showPendingModal', function () {
                modal.show();
            });

            scope.$on('hidePendingModal', function () {
                modal.hide();
            });
        }
    }
}]);

module.directive('activeModal', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict:'E',
        template:'<div></div>',
        link:function (scope, element) {
            var template = $templateCache.get('activeModal.html');
            var content = $compile(template)(scope);
            var conf = {
                content:content,
                height:"90%"
            };
            var modal = element.modal(conf);

            modal.on('hide', function () {
                scope.currentUser = {};
            });

            scope.$on('showActiveModal', function () {
                modal.show();
            });

            scope.$on('hideActiveModal', function () {
                modal.hide();
            });
        }
    }
}]);

module.directive('inactiveModal', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict:'E',
        template:'<div></div>',
        link:function (scope, element) {
            var template = $templateCache.get('inactiveModal.html');
            var content = $compile(template)(scope);
            var conf = {
                content:content,
                height:"80%"
            }
            var modal = element.modal(conf);

            modal.on('hide', function () {
                scope.currentUser = {};
            })

            scope.$on('showInactiveModal', function () {
                modal.show();
            });

            scope.$on('hideInactiveModal', function () {
                modal.hide();
            });
        }
    }
}]);

module.directive('packsHistoryModal', ['$templateCache', '$compile', function ($templateCache, $compile) {
    return {
        restrict:'E',
        template:'<div></div>',
        link:function (scope, element) {
            var template = $templateCache.get('packsHistoryModal.html');
            var content = $compile(template)(scope);
            var conf = {
                content:content,
                height:"90%"
            };
            var modal = element.modal(conf);

            scope.$on('showPackHistoryModal', function () {
                modal.show();
            });

            scope.$on('hidePackHistoryModal', function () {
                modal.hide();
            });
        }
    }
}]);


module.directive('modificationMessages', function () {
    return {
        restrict:'A',
        link:function (scope, element) {
            element.form({
                "messages":{
                    "required":"Error message for all required fields.",
                    "email":"Show this message on email format error."
                }
            });
        }
    }
});

module.directive('onEnterKey', function () {
    return {
        restrict:'A',
        link:function (scope, element, attrs) {
            element.on("keydown", function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    scope.$apply(attrs.onEnterKey);
                }
            });
        }
    }
});

module.directive('onBlur', function () {
    return {
        restrict:'A',
        link:function (scope, element, attrs) {
            element.on("blur", function () {
                scope.$apply(attrs.onBlur);
            });
        }
    }
});

module.directive('logoUpload', function () {
    return {
        restrict:'E',
        template:'<span style="text-align:left;"><input type="file" hidden="true""/>' +
            '<span><a href="#">Subir</a></span></span>',
        link:function (scope, element, attrs) {
            var file = element.find("input");
            var link = element.find("a");
            var fReader = new FileReader();

            file.attr("id", attrs.type + "File");
            file.on("change", function () {
                scope.$apply(scope.showLogoLink(attrs.type, true));
                fReader.readAsBinaryString(this.files[0]);
            });
            link.on("click", function () {
                file.click();
            });

            fReader.onload = function () {
                var logoType = attrs.type;
                var logoFile = btoa(fReader.result);
                var logoFileType = file[0].files[0].type;

                scope.postLogo(logoType, logoFile, logoFileType);
            }
        }}
});





