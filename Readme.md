# Service de Métriques – RepAIr   -IBRAHIMI Yasmine

Ce service a pour objectif de **collecter**, **exposer** et **visualiser** les métriques de tous les microservices de  **RepAIr**. Il est composé de :

-  **Prometheus** : collecte des métriques exposées par chaque service
- **Grafana** : interface de visualisation des données
-  Un **microservice Node.js** qui expose des métriques personnalisées

---

##  Fonctionnalités principales

- Récupération des **métriques HTTP** (nombre de requêtes, codes HTTP, méthodes)
- Scraping automatique toutes les **5 secondes**
- Visualisation en temps réel via **Grafana**
- Intégration avec les services suivants :
  - IA (`9102`)
  - Authentification (`9104`)
  - Base de données (`9101`)
  - Notifications (`9105`)
  - Paiement (`9103`)
  - Et ce service lui-même (`9100`)

---

### Microservice Node.js (port `9100`)

Expose deux routes :
- `/` : message simple de confirmation
- `/metrics` : métriques Prometheus au format texte

Métriques personnalisées :
```text
http_requests_total{method="GET", route="/", status="200"} 1
