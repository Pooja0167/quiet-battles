import type { Schema, Struct } from '@strapi/strapi';

export interface ChapterHighlight extends Struct.ComponentSchema {
  collectionName: 'components_chapter_highlights';
  info: {
    displayName: 'Highlight';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'chapter.highlight': ChapterHighlight;
    }
  }
}
