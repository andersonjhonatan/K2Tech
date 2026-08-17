export function BoostifySitePreview() {
  return (
    <div className="boostify-site-preview" aria-hidden="true">
      <div className="boostify-preview-nav">
        <strong><span>BOOSTIFY</span> Agencia Digital</strong>
        <div><i>Servicos</i><i>Beneficios</i><b>Contato</b></div>
      </div>
      <div className="boostify-preview-body">
        <span className="boostify-preview-pill"><i /> ESTRATEGIA QUE MOVE NEGOCIOS</span>
        <h4>Aumente suas vendas com estrategias <em>digitais inteligentes</em></h4>
        <p>Trafego pago, redes sociais e automacao para transformar atencao em oportunidades reais.</p>
        <div className="boostify-preview-actions">
          <b>Falar com especialista <span>+</span></b>
          <i>WhatsApp</i>
        </div>
        <div className="boostify-preview-proof">
          <span>Diagnostico personalizado</span>
          <span>Foco em performance</span>
        </div>
      </div>
      <div className="boostify-preview-orb boostify-orb-one" />
      <div className="boostify-preview-orb boostify-orb-two" />
    </div>
  );
}

export function WeatherAppPreview() {
  return (
    <div className="weather-app-preview" aria-hidden="true">
      <div className="weather-preview-topbar">
        <div className="weather-preview-brand">
          <b>K2</b>
          <span><strong>Weather</strong><small>tempo inteligente</small></span>
        </div>
        <div className="weather-preview-unit"><b>C</b><span>F</span></div>
      </div>
      <div className="weather-preview-search">
        <span>Q</span><i>Buscar cidade ou CEP</i><b>Buscar</b>
      </div>
      <div className="weather-preview-card">
        <div className="weather-preview-location">
          <span>Ibimirim, Pernambuco</span>
          <i>favorito</i>
        </div>
        <div className="weather-preview-main">
          <span className="weather-preview-sun">SUN</span>
          <div><strong>29<span>C</span></strong><b>Ceu limpo</b><small>Sensacao de 30 C</small></div>
        </div>
        <div className="weather-preview-metrics">
          <span><i>H</i><small>Umidade</small><b>48%</b></span>
          <span><i>W</i><small>Vento</small><b>18 km/h</b></span>
          <span><i>V</i><small>Visibilidade</small><b>10 km</b></span>
        </div>
      </div>
      <div className="weather-preview-hours">
        <span><small>Agora</small><i>Sol</i><b>29</b></span>
        <span><small>11:00</small><i>Sol</i><b>30</b></span>
        <span><small>12:00</small><i>Nuvem</i><b>31</b></span>
        <span><small>13:00</small><i>Sol</i><b>32</b></span>
      </div>
    </div>
  );
}
