/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run my application.
 */

/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object and
        * ensures it has a URL defined and that the URL is not empty 
        */

         it('each feed in the allFeeds object has a defined and non-empty url property', function() {
            allFeeds.forEach(function(entry) {
                expect(entry.url).toBeDefined();
                console.log(entry.url);
                expect(entry.url.length).not.toBe(0);
            });
            
         });


        /* This test loops through each feed in the allFeeds object and
        * ensures it has a name defined and that the name is not empty 
        */
         it('each feed in the allFeeds object has a defined and non-empty name property', function() {
             allFeeds.forEach(function(entry) {
                expect(entry.name).toBeDefined();
                console.log(entry.name);
                expect(entry.name.length).not.toBe(0);
            });           
         });         
    });


    /* Adds a new test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default. It checks to see if body initializes the
         * 'menu-hidden' class. When this class is included, the menu is hidden.
         */
         var $body = $('body'),
             $menuLink = $('.menu-icon-link');
         it('the menu is hidden by default', function() {
            expect($body.hasClass('menu-hidden')).toBe(true);
         });
         /* This test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * clicks the menu link once to see if the 'menu-hidden' class
          * is removed which means the menu is visible. It then triggers
          * a second click to see if the class is added back in which
          * toggles the menu off.
          */
          it('the menu becomes visible when menuLink is clicked, and it returns to invisible when menuLink is clicked again', function() {
              $menuLink.click();
              expect($body.hasClass('menu-hidden')).toBe(false);
              $menuLink.click();
              expect($body.hasClass('menu-hidden')).toBe(true);
          });

    });  

    /* Adds a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Because loadFeed is an asynchronous function, we
         * add the done callback to it and call it before each test in the suite
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });
   
        it('should have >= one entry in feed container', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    }); 
    /* Adds a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * headerOne and headerTwo are defined. headerOne is assigned in
         * the beforeeach call and headerTwo is defined in the it. They
         * are compared within the loadFeed(1, ...) function scope to 
         * ensure the calls are finished. 
         */
        var headerOne,
            headerTwo;
        beforeEach(function(done) {
            loadFeed(0, function() {
                headerOne = $('.feed').text();
                console.log(headerOne);
                done();
            });
            
        });             
        it('content changes when a new feed is selected', function(done) {
            loadFeed(1, function() {
                headerTwo = $('.feed').text();
                expect(headerOne).toBeDefined();
                expect(headerTwo).toBeDefined();
                expect(headerOne).not.toEqual(headerTwo);
                done();  
                console.log(headerTwo);
                console.log(headerOne);
            });
        }); 
    });
    

}());
