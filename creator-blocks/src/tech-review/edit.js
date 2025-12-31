import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { TextControl, Button, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const { productName, specs, pros, cons, affiliateLink } = attributes;

	// Specs helpers
	const addSpec = () => {
		setAttributes( { specs: [ ...specs, { label: '', value: '' } ] } );
	};
	const updateSpec = ( index, key, val ) => {
		const newSpecs = [ ...specs ];
		newSpecs[ index ][ key ] = val;
		setAttributes( { specs: newSpecs } );
	};
	const removeSpec = ( index ) => {
		const newSpecs = [ ...specs ];
		newSpecs.splice( index, 1 );
		setAttributes( { specs: newSpecs } );
	};

	// Pros/Cons helpers
	const addListItem = ( listName ) => {
		setAttributes( { [ listName ]: [ ...attributes[ listName ], '' ] } );
	};
	const updateListItem = ( listName, index, val ) => {
		const newList = [ ...attributes[ listName ] ];
		newList[ index ] = val;
		setAttributes( { [ listName ]: newList } );
	};
	const removeListItem = ( listName, index ) => {
		const newList = [ ...attributes[ listName ] ];
		newList.splice( index, 1 );
		setAttributes( { [ listName ]: newList } );
	};

	return (
		<div { ...useBlockProps( { className: 'creator-block-tech-review' } ) }>
			<InspectorControls>
				<PanelBody title={ __( 'Product Details', 'creator-blocks' ) }>
					<TextControl
						label={ __( 'Affiliate Link', 'creator-blocks' ) }
						value={ affiliateLink }
						onChange={ ( val ) => setAttributes( { affiliateLink: val } ) }
						help={ __( 'This link will have rel="sponsored" automatically added.', 'creator-blocks' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<TextControl
				className="product-name-input"
				label={ __( 'Product Name', 'creator-blocks' ) }
				value={ productName }
				onChange={ ( val ) => setAttributes( { productName: val } ) }
				placeholder="Product Name..."
			/>

			<div className="specs-section">
					<h4>{ __( 'Specifications', 'creator-blocks' ) }</h4>
					<table className="specs-table">
						<tbody>
							{ specs.map( ( spec, index ) => (
								<tr key={ index }>
									<td>
										<TextControl
											value={ spec.label }
											onChange={ ( val ) => updateSpec( index, 'label', val ) }
											placeholder="Label (e.g. CPU)"
										/>
									</td>
									<td>
										<TextControl
											value={ spec.value }
											onChange={ ( val ) => updateSpec( index, 'value', val ) }
											placeholder="Value (e.g. M1 Pro)"
										/>
									</td>
									<td>
										<Button isDestructive onClick={ () => removeSpec( index ) } icon="trash" />
									</td>
								</tr>
							) ) }
						</tbody>
					</table>
					<Button variant="secondary" onClick={ addSpec } icon="plus">
						{ __( 'Add Spec', 'creator-blocks' ) }
					</Button>
				</div>

			<div className="pros-cons-section">
				<div className="pros-list">
					<h4>✅ { __( 'Pros', 'creator-blocks' ) }</h4>
					<ul>
						{ pros.map( ( item, index ) => (
							<li key={ index }>
								<div className="list-item-edit">
									<RichText
										tagName="span"
										value={ item }
										onChange={ ( val ) => updateListItem( 'pros', index, val ) }
										placeholder="Good point..."
									/>
									<Button isSmall isDestructive onClick={ () => removeListItem( 'pros', index ) } icon="trash" />
								</div>
							</li>
						) ) }
					</ul>
					<Button isSmall variant="secondary" onClick={ () => addListItem( 'pros' ) } icon="plus">
						{ __( 'Add Pro', 'creator-blocks' ) }
					</Button>
				</div>

				<div className="cons-list">
					<h4>❌ { __( 'Cons', 'creator-blocks' ) }</h4>
					<ul>
						{ cons.map( ( item, index ) => (
							<li key={ index }>
								<div className="list-item-edit">
									<RichText
										tagName="span"
										value={ item }
										onChange={ ( val ) => updateListItem( 'cons', index, val ) }
										placeholder="Bad point..."
									/>
									<Button isSmall isDestructive onClick={ () => removeListItem( 'cons', index ) } icon="trash" />
								</div>
							</li>
						) ) }
					</ul>
					<Button isSmall variant="secondary" onClick={ () => addListItem( 'cons' ) } icon="plus">
						{ __( 'Add Con', 'creator-blocks' ) }
					</Button>
				</div>
			</div>
		</div>
	);
}
