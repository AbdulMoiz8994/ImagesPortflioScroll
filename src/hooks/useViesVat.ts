import axios from 'axios';
import { useState } from 'react'

const useViesVat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viesData, setViesData] = useState(null);

  async function getViesData({ countryCode="EL", vatNumber }) {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/api/vies_vat", { countryCode, vatNumber });
      const { data: result } = data;

      const info = result['env:Envelope']['env:Body']['srvc:rgWsPublic2AfmMethodResponse']['srvc:result']['rg_ws_public2_result_rtType'];
      const basicInfo = info['basic_rec'];
      const firmInfo = info['firm_act_tab'];

      setLoading(false);
      setViesData({ basicInfo, firmInfo });

      return { basicInfo, firmInfo }
    } catch (error) {
      console.log({ error })
      setLoading(false);
      setError("Invalid VAT Number");
      return { error: error.message }
    }
  }

  return {
    loading,
    getViesData,
    error,
    viesData,
    setViesData
  }
}

export default useViesVat
