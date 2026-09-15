"""Print the latest persisted model comparison."""
import json
from pathlib import Path

metrics_file = Path(__file__).resolve().parent / "models" / "model_metrics.json"
print(json.dumps(json.loads(metrics_file.read_text(encoding="utf-8")), indent=2))
