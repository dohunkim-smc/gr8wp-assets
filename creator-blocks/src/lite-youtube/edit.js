import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, TextareaControl, PanelBody, Placeholder } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const { videoUrl, title, description } = attributes;

	const extractVideoId = ( url ) => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match( regExp );
		return ( match && match[ 2 ].length === 11 ) ? match[ 2 ] : null;
	};

	const onChangeUrl = ( val ) => {
		const id = extractVideoId( val );
		setAttributes( { videoUrl: val, videoId: id || '' } );
	};

	return (
		<div { ...useBlockProps( { className: 'creator-block-lite-youtube' } ) }>
			<InspectorControls>
				<PanelBody title={ __( 'Video SEO', 'creator-blocks' ) }>
					<TextControl
						label={ __( 'Video Title', 'creator-blocks' ) }
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
					/>
					<TextareaControl
						label={ __( 'Description', 'creator-blocks' ) }
						value={ description }
						onChange={ ( val ) => setAttributes( { description: val } ) }
						help={ __( 'This description is used for the VideoObject Schema.', 'creator-blocks' ) }
					/>
				</PanelBody>
			</InspectorControls>

			{ ! videoUrl ? (
				<Placeholder icon="video-alt3" label="YouTube Video">
					<TextControl
						placeholder="Enter YouTube URL..."
						value={ videoUrl }
						onChange={ onChangeUrl }
					/>
				</Placeholder>
			) : (
				<>
					<div className="video-preview">
						<iframe
							width="100%"
							height="315"
							src={ `https://www.youtube.com/embed/${ attributes.videoId }` }
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
					<div className="video-meta-edit">
						<TextControl
							label={ __( 'Update URL', 'creator-blocks' ) }
							value={ videoUrl }
							onChange={ onChangeUrl }
						/>
					</div>
				</>
			) }
		</div>
	);
}
