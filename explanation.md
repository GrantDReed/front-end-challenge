# Asset Loading
Due to the asynchronous call for data.json and the template, treating the code procedurally could easily result in constructing the DOM before all the data is loaded. In that case, not all of our images will be added to the page.  Initially we used setTimeout as a sort of hard-coded waiting period, with the hope that our imposed delay would allow the ajax requests to finish.  A better solution is to use Promises and chain our ajax calls together in order of dependence.  That way we can be sure that all the necessary steps have been completed before we move on to constructing the DOM.

# Optimizations
1. There didn't seem to be any reason for an ajax request for the template for every product, so I just made one call and wrapped it in a Promise to pass to the next function.
2. I made sure to just create one event listener, rather than a unique event listener for each product.  The latter approach would be okay here since there aren't that many products, but it affects performance if there are lots of products on the page.
