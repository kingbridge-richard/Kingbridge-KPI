const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://kingbridge.smrtapp.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2tpbmdicmlkZ2Uuc21ydGFwcC5jb20iLCJpYXQiOjE3NTQ2NjA3OTYsInN1YiI6ImFkbWluIn0.uoIUrRm1HGANuISRPM0XgM5ZnO3GqoRXBvT0nrUmKCg'
      },
      body: JSON.stringify({
        query: `query QueryReports($query: String!, $page: Int, $limit: Int) {
          business {
            queryReports(query: $query, page: $page, limit: $limit) {
              id
              columns {
                id
                localId
                field
                index
                type
                name
                isSortable
                sortBy
                nested
              }
              values
              kpi {
                id
                type
                value
              }
            }
          }
        }`,
        variables: {
          query: `{"filter":{"d69db85a-b164-4ce2-b506-86ff5a22e536":{"special":{"Sale:readyDate":"$two_before_four_after"}},"2b42b6f4-1abf-40d1-93db-31ea78b3943e":{"terms":{"Sale:type":[1,2,4]}},"4c5cae86-7ece-492f-8f05-a796352c6bcf":{"term":{"disabled":false}},"a40922d9-c0af-4a6d-9dc6-6ab8a6a15b23":{"term":{"SaleItem:alterOnly":false}},"29d83992-eaa7-48e6-a731-325d14ab6a86":{"terms":{"Item:status":["2","3","4","13"]}},"cbbdd677-bcc6-4eeb-aca5-7f7ab2b2e5ff":{"term":{"disabled":false}}},"columns":[],"columns2D":{},"columns3D":{"3a773b93-b793-4a6c-81b9-16ea1b6435f9":{"method":"count","field":null}},"kpi":{"field":null,"method":"count"},"groups":{"f0184933-ecd4-47d4-9afb-afcd3a7b60b0":{"field":"Sale:readyDate","interval":"day"},"fe21b01c-5a7f-47fd-811a-ff34cbdf5eb8":{"field":"financial_department"}},"report_index":"sale_items","updated_at":"2022-07-21T17:06:55+00:00","customizations":{"sort":null},"type_overrides":null,"name_overrides":null,"nested_aggs_filter":null,"id":"20460a46-6a79-43ae-b2b3-df096ba37a94"}`,
          page: 1,
          limit: 5000
        }
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
};
