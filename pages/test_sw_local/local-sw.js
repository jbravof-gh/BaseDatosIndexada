const CACHE_NAME = 'VS_pwa';

/* self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.add("./local_sw.html");
  })());
}); */

self.addEventListener('fetch', event => {
    console.log(`URL requested: ${event.request.url}`);
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Try the cache first.
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse !== undefined) {
            const simpleResponse = new Response("Body of the HTTP response");

            const options = {
                status: 200,
                headers: {
                    'Content-type': 'text/html'
                }
            };
            const htmlResponse = new Response("<b>HTML</b> content", options)
            console.log("htmlResponse", htmlResponse)
            console.log("htmlResponse_url", htmlResponse.body)
            console.log("htmlResponse_text", htmlResponse.text)
            //window.document.body.innerHTML+="<div>hola</div>"
            // Cache hit, let's send the cached resource.
            console.log("cached", cachedResponse)
            //************    return htmlResponse;
            return cachedResponse;


        } else {

            try {

                const options = {
                    status: 200,
                    headers: {
                        'Content-type': 'text/html'
                    }
                };
                const htmlResponse = new Response("<b>HTML</b> content", options)
                console.log("htmlResponse", htmlResponse)
                console.log("htmlResponse_url", htmlResponse.body)
                console.log("htmlResponse_text", htmlResponse.text)


                return htmlResponse;
            }

            catch (e) { }

        }


    })());
});

/*          // Nothing in cache, let's go to the network.
 
         try {
             const fetchResponse = await fetch(event.request);
             // Save the new resource in the cache (responses are streams, so we need to clone in order to use it here).
             cache.put(event.request, fetchResponse.clone());
             console.log("fetched", fetchResponse)
             // And return it.
             return fetchResponse;
         } catch (e) {
             // Fetching didn't work let's go to the error page.
             if (event.request.mode === 'navigate') {
                 await rememberRequestedTip(event.request.url);
                 const errorResponse = await cache.match('./pages/offline.html');
                 return errorResponse;
             }
         }
     
         }
 */