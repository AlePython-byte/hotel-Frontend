import { formatCurrency } from "../../utils/currencyUtils";

interface PricePreviewProps {
  nights: number;
  total: number;
  isHighSeason: boolean;
}

function PricePreview({ nights, total, isHighSeason }: PricePreviewProps) {
  return (
    <div className="price-preview">
      <p><strong>Noches:</strong> {nights}</p>
      <p><strong>Temporada:</strong> {isHighSeason ? "Alta" : "Baja"}</p>
      <p className="price-highlight"><strong>Total estimado:</strong> {formatCurrency(total)}</p>
    </div>
  );
}

export default PricePreview;
