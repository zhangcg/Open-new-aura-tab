public with sharing class myAccountController {
    public myAccountController() {

    }

    @AuraEnabled
    public static Account getAccountById(String accountId) {

        System.debug(accountId);

        Account result = [select id, name, BillingAddress from Account Where Id = :accountId];
        return result;
    }
}
