({
    handleClick : function(component, event, helper) {

        var navService = component.find("navigationService");
        console.log(component.get("v.simpleRecord.Id"));
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__newtab',
                pageName: 'Test'
            },
            state: {
                "c__accountId": component.get("v.simpleRecord.Id")
            } 
        };
        const handleUrl = (url) => {
            window.open(url);
        };
        
        const handleError = (error) => {
            console.log(error);
        };

        navService.generateUrl(pageReference).then(handleUrl, handleError);
    },
    handleClickForWorkspaceAPI : function(component, event, helper) {
        //initialize the service components
        var workspaceAPI = component.find("workspace");
        var navService = component.find("navigationService");

        // set the pageReference object used to navigate to the component. Include any parameters in the state key.
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__newtab',
                pageName: 'Test'
            },
            state: {
                "c__accountId": component.get("v.simpleRecord.Id")
            } 
        };
        console.log("111111");

        // handles checking for console and standard navigation and then navigating to the component appropriately
        workspaceAPI.isConsoleNavigation().then(function(isConsole) {
            console.log("222222" + isConsole);
            if (isConsole) {
              //  // in a console app - generate a URL and then open a subtab of the currently focused parent tab
              navService.generateUrl(pageReference).then(function(cmpURL) {
                workspaceAPI.getEnclosingTabId()
                    .then(function(tabId) {
                        return workspaceAPI.openSubtab({
                        parentTabId: tabId,
                        url: cmpURL,
                        focus: true
                        });
                    })
                    .then(function(subTabId) {
                        // the subtab has been created, use the Id to set the label
                        workspaceAPI.setTabLabel({
                        tabId: subTabId,
                        label: "My Label"
                        });
                    });
              });
            } else {
                const handleUrl = (url) => {
                    window.open(url);
                };
                
                const handleError = (error) => {
                    console.log(error);
                };
                // this is standard navigation, use the navigate method to open the component
                // navService.navigate(pageReference, false);
                navService.generateUrl(pageReference).then(handleUrl, handleError);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
    }
})
