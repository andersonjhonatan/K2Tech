type MontagemPreviewProps = {
  imageUrl: string;
};

export function MontagemSitePreview({ imageUrl }: MontagemPreviewProps) {
  return (
    <div className="montagem-current-preview" aria-hidden="true">
      <div className="montagem-current-copy">
        <span>MONTAGEM PROFISSIONAL DE MÓVEIS</span>
        <strong>Seu móvel montado <em>do jeito certo.</em></strong>
        <p>Cuidado, precisão e experiência para transformar peças em um ambiente pronto.</p>
        <i>Solicitar orçamento</i>
      </div>
      <div className="montagem-current-visual">
        <div className="montagem-current-glow" />
        <div className="montagem-current-image" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className="montagem-current-float">
          <b>Montagem com precisão</b>
          <span>Cuidado do início ao acabamento.</span>
        </div>
      </div>
    </div>
  );
}
