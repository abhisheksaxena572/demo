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
        List<product2> prod = productData.allProd();
        System.assertEquals('pro1', prod[0].Name); 
        List<product2> prod1 = productData.subList();
        System.assertEquals('pro1', prod1[0].Name); 
        List<product2> prod2 = productData.serviceList();
        System.assertEquals('pro2', prod2[0].Name); 
        List<product2> prod3 = productData.inventList();
        System.assertEquals('pro3', prod3[0].Name); 
        Test.stopTest();
    }  
}
