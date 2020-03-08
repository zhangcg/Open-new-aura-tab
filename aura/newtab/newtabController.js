({
    init : function(component, event, helper) {
        var pageReference = component.get("v.pageReference");
        var accountId = pageReference.state.c__accountId;
        var action = component.get("c.getAccountById");
        action.setParams({ accountId : accountId  });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.acccountInfo", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);

    }
})
