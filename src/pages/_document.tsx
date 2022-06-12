// import { Meta } from 'features/user-profile/order/order-card/order-card.style';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';
import { eshopMetaContent, googleMapKey, metrimoID, siteURL, skroutzKey } from 'site-settings/site-credentials';
import { ServerStyleSheet } from 'styled-components';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
           <script src={`https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3&libraries=geometry,places`} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href={`${siteURL}/wp-content/uploads/2021/05/cropped-sfkshop-favicon-new-512-1-192x192.png`} />
          
          {/* Integration of eshopswithiq */}
          <meta name="google-site-verification" content={eshopMetaContent} /> 
        </Head>
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />

          <script data-host="https://app.metrimo.io" data-dnt="false" src="https://app.metrimo.io/js/script.js" id={metrimoID} async defer />
          <script dangerouslySetInnerHTML={{ __html: `
            (function(a,b,c,d,e,f,g){a['SkroutzAnalyticsObject']=e;a[e]= a[e] || function(){
              (a[e].q = a[e].q || []).push(arguments);};f=b.createElement(c);f.async=true;
              f.src=d;g=b.getElementsByTagName(c)[0];g.parentNode.insertBefore(f,g);
            })(window,document,'script','https://analytics.skroutz.gr/analytics.min.js','skroutz_analytics');
            skroutz_analytics('session', 'connect', '${skroutzKey}');  // Connect your Account.
            ` }} />

          <script dangerouslySetInnerHTML={{__html: `
            (function(a,b,c,d,e,f,g){a['EshopsWithIQObject']=e;a[e]= a[e] || function(){
              (a[e].q = a[e].q || []).push(arguments);};f=b.createElement(c);f.async=true;
              f.src=d;g=b.getElementsByTagName(c)[0];g.parentNode.insertBefore(f,g);
              })(window,document,'script','//cts.eshopswithiq.com/analytics.js','eshopswithiq_analytics');
              eshopswithiq_analytics('connect');
              //(if it is a product page you may optionally include the ID of the product like this: 
              //eshopswithiq_analytics('connect', {'product_id': '1024'});)
          `}}/>
        </body>
      </Html>
    );
  }
}
