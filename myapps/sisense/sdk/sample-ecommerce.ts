import type { Dimension, DateDimension, Attribute } from '@sisense/sdk-data';

import { createAttribute, createDateDimension, createDimension } from '@sisense/sdk-data';

export const DataSource = 'Sample ECommerce';

interface BrandDimension extends Dimension {
  Brand: Attribute;
  BrandID: Attribute;
}
export const Brand = createDimension({
  name: 'Brand',
  Brand: createAttribute({
    name: 'Brand',
    type: 'text-attribute',
    expression: '[Brand.Brand]',
  }),
  BrandID: createAttribute({
    name: 'BrandID',
    type: 'numeric-attribute',
    expression: '[Brand.Brand ID]',
  }),
}) as BrandDimension;

interface CategoryDimension extends Dimension {
  Category: Attribute;
  CategoryID: Attribute;
  CategoryHTML: Attribute;
}
export const Category = createDimension({
  name: 'Category',
  Category: createAttribute({
    name: 'Category',
    type: 'text-attribute',
    expression: '[Category.Category]',
  }),
  CategoryID: createAttribute({
    name: 'CategoryID',
    type: 'numeric-attribute',
    expression: '[Category.Category ID]',
  }),
  CategoryHTML: createAttribute({
    name: 'CategoryHTML',
    type: 'text-attribute',
    expression: '[Category.CategoryHTML]',
  }),
}) as CategoryDimension;

interface CommerceDimension extends Dimension {
  AgeRange: Attribute;
  BrandID: Attribute;
  CategoryID: Attribute;
  Condition: Attribute;
  Cost: Attribute;
  CountryID: Attribute;
  Date_Text: Attribute;
  Gender: Attribute;
  Quantity: Attribute;
  Revenue: Attribute;
  Test_JLLC: Attribute;
  VisitID: Attribute;
  Date: DateDimension;
}
export const Commerce = createDimension({
  name: 'Commerce',
  AgeRange: createAttribute({
    name: 'AgeRange',
    type: 'text-attribute',
    expression: '[Commerce.Age Range]',
  }),
  BrandID: createAttribute({
    name: 'BrandID',
    type: 'numeric-attribute',
    expression: '[Commerce.Brand ID]',
  }),
  CategoryID: createAttribute({
    name: 'CategoryID',
    type: 'numeric-attribute',
    expression: '[Commerce.Category ID]',
  }),
  Condition: createAttribute({
    name: 'Condition',
    type: 'text-attribute',
    expression: '[Commerce.Condition]',
  }),
  Cost: createAttribute({
    name: 'Cost',
    type: 'numeric-attribute',
    expression: '[Commerce.Cost]',
  }),
  CountryID: createAttribute({
    name: 'CountryID',
    type: 'numeric-attribute',
    expression: '[Commerce.Country ID]',
  }),
  Date_Text: createAttribute({
    name: 'Date_Text',
    type: 'text-attribute',
    expression: '[Commerce.Date_Text]',
  }),
  Gender: createAttribute({
    name: 'Gender',
    type: 'text-attribute',
    expression: '[Commerce.Gender]',
  }),
  Quantity: createAttribute({
    name: 'Quantity',
    type: 'numeric-attribute',
    expression: '[Commerce.Quantity]',
  }),
  Revenue: createAttribute({
    name: 'Revenue',
    type: 'numeric-attribute',
    expression: '[Commerce.Revenue]',
  }),
  Test_JLLC: createAttribute({
    name: 'Test_JLLC',
    type: 'text-attribute',
    expression: '[Commerce.Test_JLLC]',
  }),
  VisitID: createAttribute({
    name: 'VisitID',
    type: 'numeric-attribute',
    expression: '[Commerce.Visit ID]',
  }),
  Date: createDateDimension({
    name: 'Date',
    expression: '[Commerce.Date (Calendar)]',
  }),
}) as CommerceDimension;

interface CountryDimension extends Dimension {
  Country: Attribute;
  CountryID: Attribute;
  CountryHTML: Attribute;
}
export const Country = createDimension({
  name: 'Country',
  Country: createAttribute({
    name: 'Country',
    type: 'text-attribute',
    expression: '[Country.Country]',
  }),
  CountryID: createAttribute({
    name: 'CountryID',
    type: 'numeric-attribute',
    expression: '[Country.Country ID]',
  }),
  CountryHTML: createAttribute({
    name: 'CountryHTML',
    type: 'text-attribute',
    expression: '[Country.CountryHTML]',
  }),
}) as CountryDimension;

interface MeasuresDimension extends Dimension {
  ID: Attribute;
  MeasureHTML: Attribute;
  Name: Attribute;
}
export const Measures = createDimension({
  name: 'Measures',
  ID: createAttribute({
    name: 'ID',
    type: 'numeric-attribute',
    expression: '[Measures.ID]',
  }),
  MeasureHTML: createAttribute({
    name: 'MeasureHTML',
    type: 'text-attribute',
    expression: '[Measures.MeasureHTML]',
  }),
  Name: createAttribute({
    name: 'Name',
    type: 'text-attribute',
    expression: '[Measures.Name]',
  }),
}) as MeasuresDimension;

interface Measures1Dimension extends Dimension {
  ID: Attribute;
  MeasureHTML1: Attribute;
  Name: Attribute;
}
export const Measures1 = createDimension({
  name: 'Measures1',
  ID: createAttribute({
    name: 'ID',
    type: 'numeric-attribute',
    expression: '[Measures1.ID]',
  }),
  MeasureHTML1: createAttribute({
    name: 'MeasureHTML1',
    type: 'text-attribute',
    expression: '[Measures1.MeasureHTML1]',
  }),
  Name: createAttribute({
    name: 'Name',
    type: 'text-attribute',
    expression: '[Measures1.Name]',
  }),
}) as Measures1Dimension;
