import axios from 'axios';
import convert from 'xml-js';
import validateVat, {ViesValidationResponse} from 'validate-vat-ts';

export default async function handler(req: any, res: any) {
  // const countryCode: any = "EL";
  // const vatNumber = "071481617";
  const { countryCode, vatNumber } = req.body;

  // console.log({ reqBody: req.body })

  // Secret credentials
  const username = "071481617NP";
  const password = "@071481617np";

  try {
    const validationInfo: ViesValidationResponse = await validateVat(countryCode, vatNumber);
    
    if (validationInfo.valid === false) throw new Error("Invalid vat number");

    const headers = {
      'Content-Type': 'application/soap+xml; charset="utf-8"',
      'SOAPAction': 'http://rgwspublic2/RgWsPublic2Service:rgWsPublic2AfmMethod'
    }

    const xml = `<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope" xmlns:ns1="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:ns2="http://rgwspublic2/RgWsPublic2Service" xmlns:ns3="http://rgwspublic2/RgWsPublic2">
      <env:Header>
        <ns1:Security>
          <ns1:UsernameToken>
            <ns1:Username>${username}</ns1:Username>
            <ns1:Password>${password}</ns1:Password>
          </ns1:UsernameToken>
        </ns1:Security>
      </env:Header>
      <env:Body>
        <ns2:rgWsPublic2AfmMethod>
          <ns2:INPUT_REC>
            <ns3:afm_called_by/>
            <ns3:afm_called_for>${validationInfo.vatNumber}</ns3:afm_called_for>
          </ns2:INPUT_REC>
        </ns2:rgWsPublic2AfmMethod>
      </env:Body>
      </env:Envelope>`;
      
    const { data } = await axios.post('https://www1.gsis.gr:443/wsaade/RgWsPublic2/RgWsPublic2', xml, { headers })

    const result = convert.xml2js(data, { compact: true });
    res.status(200).json({ succes: true, data: result, validationInfo });
  } catch (error) {
    console.log("/api/vies_vat :: ", { error });
    res.status(404).json({ success: false, data: {} })
  }
};





// LEGACY CODE
/*
function check() {
  const ErrorResponse = <N, M>(n: N, m: M) => {
    return {
      status: "checking",
      error: {
        name: n,
        message: m
      }
    };
  };

  enum EUVatError {
    INVALID_EU_CODE = 'INVALID_EU_CODE',
    INVALID_VAT_NUMBER = 'INVALID_VAT_NUMBER',
    SERVER_ERROR = 'SERVER_ERROR',
    PARSE_ERROR = 'PARSE_ERROR',
  }
  
  const parseResponse = (json: any) => {
    let obj = json['soap:Envelope']['soap:Body']['checkVatApproxResponse'];
    let _r = new Set(['_attributes', 'requestIdentifier']);
    Object.keys(obj)
      .forEach((k) => {
        if (_r.has(k)) 
          delete obj[k];
        else
          obj[k] = k === 'valid' ? obj[k]._text === 'true' : obj[k]._text;
      });
    return {
      status: "Successsss",
      info: obj
    };
  };


  const envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ec.europa.eu:taxud:vies:services:checkVat:types">\
    <soapenv:Header/>\
    <soapenv:Body>\
      <urn:checkVatApprox>\
        <urn:countryCode>${"EL"}</urn:countryCode>\
        <urn:vatNumber>${"071481617"}</urn:vatNumber>\
      </urn:checkVatApprox>\
    </soapenv:Body>\
    </soapenv:Envelope>`;

    srj({
      envelope,
      url: 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService',
      // SOAPAction: 'urn:ec.europa.eu:taxud:vies:services:checkVat:types'
      SOAPAction: ''
    }) .then(res => {
      console.log({ res });

      if (res instanceof Error)
      return ErrorResponse(EUVatError.SERVER_ERROR, res.message);

      console.log({ check: parseResponse(JSON.parse(res)) })

      try {
        return parseResponse(JSON.parse(res));
      } catch (err) {
        return ErrorResponse(EUVatError.PARSE_ERROR, err instanceof Error ? err.message : 'Error parsing.');
      }

    })
    .catch(e => ErrorResponse(EUVatError.SERVER_ERROR, e.message));
}*/