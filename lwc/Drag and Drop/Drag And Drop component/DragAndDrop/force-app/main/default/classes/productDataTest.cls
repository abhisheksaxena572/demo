@isTest
public class productDataTest {
    @testSetup static void setup() { 
        opportunity op = new opportunity(name='testopp',CloseDate=date.today(),StageName='Perception Analysis');
        insert op;
        Product2 pro1 = New Product2(name='pro1',family='Subscription');
        insert pro1; 
        Product2 pro2 = New Product2(name='pro2',family='Service');
        insert pro2;
        Product2 pro3 = New Product2(name='pro3',family='Inventory');
        insert pro3;
    }
    
    static testMethod void  forProductList() {  
        Test.startTest();
        List<product2> prod1 = productData.subList();
        System.assertEquals('pro1', prod1[0].Name); 
        List<product2> prod2 = productData.serviceList();
        System.assertEquals('pro2', prod2[0].Name); 
        List<product2> prod3 = productData.inventList();
        System.assertEquals('pro3', prod3[0].Name); 
        Test.stopTest();
    } 
    static testMethod void  saveProducts() { 
        List<opportunity> opp = [ Select id,One_Year__c,Two_Year__c,Three_Year__c from opportunity where name='testopp'];
        List<product2> prod1 = [ Select id,name from product2 where family= 'Subscription'];
        List<product2> prod2 = [ Select id,name from product2 where family= 'Service'];
        List<product2> prod3 = [ Select id,name from product2 where family= 'Inventory'];
        Test.startTest();
        productData.oneYear(prod1[0].name, opp[0].id);
        productData.twoYear(prod2[0].name, opp[0].id);
        productData.threeYear(prod3[0].name, opp[0].id);
        Test.stopTest();
        //asserts
        List<opportunity> op = [Select id,name,One_Year__c,Two_Year__c,Three_Year__c from opportunity where id=:opp[0].id];
        System.assertEquals(prod1[0].name, op[0].One_Year__c);
        System.assertEquals(prod2[0].name, op[0].Two_Year__c);
        System.assertEquals(prod3[0].name, op[0].Three_Year__c);
    } 
}