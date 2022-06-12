import React from 'react'

const SkroutzBadge = () => {
  return (
    <>
    {/* <script 
      dangerouslySetInnerHTML={{ __html: `
      (function(a,b,c,d,e,f,g){a['SkroutzAnalyticsObject']=e;a[e]= a[e] || function(){
        (a[e].q = a[e].q || []).push(arguments);};f=b.createElement(c);f.async=true;
        f.src=d;g=b.getElementsByTagName(c)[0];g.parentNode.insertBefore(f,g);
      })(window,document,'script','https://analytics.skroutz.gr/analytics.min.js','skroutz_analytics');
      skroutz_analytics('session', 'connect', 'SA-6078-2183');  // Connect your Account.

      skroutz_analytics('ecommerce', 'addOrder', {
        order_id:      '123456',                // Order ID. Required.
        revenue:       '4417.58',               // Grand Total. Includes Tax and Shipping. Does not include payment costs.
        shipping:      '5.45',                  // Total Shipping Cost. Does not include payment costs.
        tax:           '1014.79',               // Total Tax.
        paid_by:       'example_paid_by',       // [Optional] Payment method type, e.g. bank_transfer.
        paid_by_descr: 'Example paid_by_descr'  // [Optional] Payment method description, e.g. Bank transfer.
      });
      skroutz_analytics('ecommerce', 'addItem', {
        order_id:   '123456',                                    // Order ID. Required.
        product_id: '111222',                                    // Product ID. Required.
        name:       'Apple IPhone 6 Plus (16GB) Space Gray EU',  // Product Name. Required.
        price:      '654.90',                                    // Price per Unit. Required.
        quantity:   '4'                                          // Quantity of Items. Required.
      });
    
      skroutz_analytics('ecommerce', 'addItem', {
        order_id:   '123456',
        product_id: '303404',
        name:       'Motorola Nexus 6 (64GB) EU Light Gray',
        price:      '590.99',
        quantity:   '1'
      });
    
      skroutz_analytics('ecommerce', 'addItem', {
        order_id:   '123456',
        product_id: '121234',
        name:       'LG G4 (64GB) EU Leather',
        price:      '600.77',
        quantity:   '2'
      });
      ` }}
    /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: `<script>
      (function(a,b,c,d,e,f,g){a[‘SkroutzAnalyticsObject’]=e;a[e]= a[e] || function(){
        (a[e].q = a[e].q || []).push(arguments);};f=b.createElement(c);f.async=true;
        f.src=d;g=b.getElementsByTagName(c)[0];g.parentNode.insertBefore(f,g);
        })(window,document,‘script’,‘https://analytics.skroutz.gr/analytics.min.js','skroutz_analytics’);
        skroutz_analytics(‘session’, ‘connect’, ‘SA-6078-2183’);  // Connect your Account.
      </script>` }} /> */}
      <div id="sa-badge-embedded-plugin">
        <div id="sa-badge-embedded-logo"></div>
        <div id="sa-badge-embedded-rating-container">
          <div className='sa-badge-embedded-rating-number'>
            <span>5.0</span>
          </div>
          <div className='sa-badge-embedded-stars-container'>
            <div className='sa-badge-star sa-badge-full-star'></div>
            <div className='sa-badge-star sa-badge-full-star'></div>
            <div className='sa-badge-star sa-badge-full-star'></div>
            <div className='sa-badge-star sa-badge-full-star'></div>
            <div className='sa-badge-star sa-badge-full-star'></div>
          </div>
        </div>
      </div>
    </> 
  )
}

export default SkroutzBadge
