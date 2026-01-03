import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { TextControl, TextareaControl, RangeControl, Button, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const { storeName, rating, reviewText, imageUrl, imageId, mapEmbed } = attributes;

	const onSelectImage = ( media ) => {
		setAttributes( {
			imageUrl: media.url,
			imageId: media.id,
		} );
	};

	return (
		<div { ...useBlockProps( { className: 'creator-block-food-review' } ) }>
			<InspectorControls>
				<PanelBody title={ __( 'Review Details', 'creator-blocks' ) }>
					<RangeControl
						label={ __( 'Rating (Stars)', 'creator-blocks' ) }
						value={ rating }
						onChange={ ( val ) => setAttributes( { rating: val } ) }
						min={ 1 }
						max={ 5 }
						step={ 0.5 }
					/>
					<TextareaControl
						label={ __( 'Map Embed Code (iframe)', 'creator-blocks' ) }
						value={ mapEmbed }
						onChange={ ( val ) => setAttributes( { mapEmbed: val } ) }
						help={ __( 'Paste the iframe code from Google Maps or Naver Maps.', 'creator-blocks' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div className="review-header">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes={ [ 'image' ] }
						value={ imageId }
						render={ ( { open } ) => (
							<div className="image-wrapper" onClick={ open }>
								{ imageUrl ? (
									<img src={ imageUrl } alt={ storeName } />
								) : (
									<Button variant="secondary">{ __( 'Upload Image', 'creator-blocks' ) }</Button>
								) }
							</div>
						) }
					/>
				</MediaUploadCheck>
			</div>
			<div className="review-content">
				<TextControl
					className="store-name-input"
					label={ __( 'Store Name', 'creator-blocks' ) }
					value={ storeName }
					onChange={ ( val ) => setAttributes( { storeName: val } ) }
					placeholder="Store Name..."
				/>
				<div className="rating-display">
					{ [ 1, 2, 3, 4, 5 ].map( ( index ) => (
						<span
							key={ index }
							onClick={ () => setAttributes( { rating: index } ) }
							style={ {
								cursor: 'pointer',
								opacity: index <= rating ? 1 : 0.25,
							} }
							role="button"
							tabIndex={ 0 }
							onKeyDown={ ( e ) => {
								if ( e.key === 'Enter' || e.key === ' ' ) {
									setAttributes( { rating: index } );
								}
							} }
						>
							⭐
						</span>
					) ) }
					<span style={ { marginLeft: '8px' } }>({ rating } / 5)</span>
				</div>
				<RichText
					tagName="p"
					value={ reviewText }
					onChange={ ( val ) => setAttributes( { reviewText: val } ) }
					placeholder={ __( 'Write your short review here...', 'creator-blocks' ) }
				/>
			</div>
		</div>
	);
}
