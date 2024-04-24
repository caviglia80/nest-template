import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('float', {
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text', {
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) this.slug = this.title;

        this.slug = this.slug
            .toLowerCase()                  // Convertir a minúsculas
            .trim()                         // Eliminar espacios al inicio y al final
            .replaceAll(/\s+/g, '-')        // Reemplazar espacios con guiones
            .replaceAll(/[^\w-]/g, '');     // Eliminar todos los caracteres no alfanuméricos excepto guiones
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.title;             // por si cambio el titulo vuelvo a generar el slug

        this.slug = this.slug
            .toLowerCase()                  // Convertir a minúsculas
            .trim()                         // Eliminar espacios al inicio y al final
            .replaceAll(/\s+/g, '-')        // Reemplazar espacios con guiones
            .replaceAll(/[^\w-]/g, '');     // Eliminar todos los caracteres no alfanuméricos excepto guiones
    }


}
