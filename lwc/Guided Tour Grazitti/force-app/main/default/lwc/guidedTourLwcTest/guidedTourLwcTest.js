import { LightningElement, api } from 'lwc'; 
import { loadScript, loadStyle } from 'lightning/platformResourceLoader'; 
import getTourDetails from '@salesforce/apex/GuidedTourService.getTourDetails'; 
import isguest from '@salesforce/user/isGuest';
import customres from '@salesforce/resourceUrl/guidedTourService';
export default class GuidedTourLwcTest extends LightningElement {
    @api guidedTour = customres 
    @api tourMap;
    @api pathName
    @api title
    @api bgTile; 
    @api bgStepNext
    @api textContent
    @api textStepNext
    @api pageName; 
    isguest = isguest; 
    connectedCallback() {
        console.log('inside constructor:',document.querySelector("c-demo-lwc-cmp"))   
        var test = document.querySelector("c-demo-lwc-cmp").getElementsByClassName("target1")
        //var test1 =document.querySelector("c-demo-lwc-cmp").shadowRoot.querySelector(".target1")
        //console.log("test1:"+test1)
        //var test1 =document.querySelector("c-demo-lwc-cmp").shadowRoot.querySelector(".target1")
        console.log("test:"+test)
       // console.log("test:"+test1)
        Promise.all([
            loadScript(this, `${this.guidedTour}/hopscotch.js`),
            loadStyle(this, `${this.guidedTour}/hopscotch.css`)
        ])
        .then(() => { 
            console.log('Files loaded.')
            console.log('title:'+document.title) 
            this.pathname = window.location.pathname;    
            this.pageName = 'Home'
            getTourDetails({ isguest : isguest, pageName : this.pageName })
                .then(result => { 
                    console.log('inside then')
                    this.tourMap = result;    
                    let result1 = JSON.parse(this.tourMap); 
                    console.log('result',result1) 
                    let stepList = [];          				// steplist which will store the steps of a tour
                    let cookieName = result.cookieName;  		// cookieName is adding here 
                    let minTime = result.setTimeOut; 			// minimum time for which our tour has to run
                    setTimeout(function(){
                      //  if(getCookie(cookieName) !== cookieName ){  
                          console.log('result tour:'+result.tour)
                            for (let i in result1.tour) { 
                                try{ 
                                    let item = result1.tour[i];  
                                    let itemToAdd = {
                                        title : item.Content__r.Name,   
                                        content : item.Content__r.Description__c,  
                                        target : eval(item.Selector__r.Target__c), 
                                        placement : item.Placement__c,
                                        arrowOffset : item.ArrowOffset__c,
                                        xOffset : item.XOffset__c,
                                        yOffset : item.YOffset__c
                                    };
                                    stepList.push(itemToAdd);
                                }
                                catch(err){
                                    console.log('element not found --- '+err.message);
                                }
                            }
                            console.log(' stepList --- ', stepList);
                            let tour = {
                                id: "guidedTour",
                                steps: stepList,
                                onEnd: function(){
                                    createcookie(cookieName);           	// function will trigger if the tour end sucessfully (Cookie will be created)
                                },
                                onClose : function(){
                                    createcookie(cookieName);				// function will trigger if the tour is closed before the last step..(Cookie will be created)
                                }
                            };   
                            console.log('before start')
                            hopscotch.startTour(tour);    					//function for triggering the tour
                            console.log('after start')
                       // } 
                        // else{
                        //     console.log("COOKIES WERE ALREADY SET")
                        // }
                    }, minTime);
                }, false);    
        })
        .catch(() => {
            //alert('error.body.message');
            console.log('Error Occurs')
        });   
    } 
        createcookie (cookieName) {   									//function for creating a cookie  
            let cookie = 'hideTour_'+cookieName + "=" +cookieName;   
            document.cookie = cookie;  
        } 
        getCookie(cookieName) { 										// function for getting a cookie  
            let name = 'hideTour_'+cookieName; 
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for(let i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0){  
                    return c.substring(nameEQ.length,c.length);
                } 
            }
            return null;
        }   
}