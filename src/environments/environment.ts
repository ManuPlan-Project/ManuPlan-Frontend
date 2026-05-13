export const environment = {
  production: false,
  apiBase: 'http://localhost:5000/manuplan',

  api: {
    iam:        'http://localhost:5000/manuplan/iam',
    products:   'http://localhost:5000/manuplan/products',
    boms:       'http://localhost:5000/manuplan/boms',
    routings:   'http://localhost:5000/manuplan/routings',
    planning:   'http://localhost:5000/manuplan/planning',
    work:       'http://localhost:5000/manuplan/workexecution',
    inventory:  'http://localhost:5000/manuplan/inventory',
    maintenance:'http://localhost:5000/manuplan/maintenance',
    capacity:   'http://localhost:5000/manuplan/capacity',
    quality:    'http://localhost:5000/manuplan/quality',
    costing:    'http://localhost:5000/manuplan/costing',
    reporting:  'http://localhost:5000/manuplan/reporting',
  }
};
