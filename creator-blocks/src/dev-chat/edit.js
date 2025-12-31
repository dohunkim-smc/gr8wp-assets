import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button, Tooltip } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { messages } = attributes;

	const addMessage = ( role ) => {
		setAttributes( { messages: [ ...messages, { role, text: '' } ] } );
	};

	const updateMessage = ( index, text ) => {
		const newMessages = [ ...messages ];
		newMessages[ index ].text = text;
		setAttributes( { messages: newMessages } );
	};

	const removeMessage = ( index ) => {
		const newMessages = [ ...messages ];
		newMessages.splice( index, 1 );
		setAttributes( { messages: newMessages } );
	};

	return (
		<div { ...useBlockProps( { className: 'creator-block-dev-chat' } ) }>
			{ messages.map( ( msg, index ) => (
					<div key={ index } className={ `chat-message ${ msg.role }` }>
						<div className="chat-avatar">
							{ msg.role === 'user' ? '👤' : '🤖' }
						</div>
						<div className="chat-bubble">
							<div className="chat-role-label">
								{ msg.role === 'user' ? __( 'You', 'creator-blocks' ) : __( 'AI', 'creator-blocks' ) }
							</div>
							<RichText
								tagName="div"
								className="chat-content"
								value={ msg.text }
								onChange={ ( val ) => updateMessage( index, val ) }
								placeholder={ msg.role === 'user' ? __( 'Enter prompt...', 'creator-blocks' ) : __( 'Enter response...', 'creator-blocks' ) }
							/>
						</div>
						<div className="chat-actions">
							<Tooltip text={ __( 'Remove Message', 'creator-blocks' ) }>
								<Button isSmall isDestructive onClick={ () => removeMessage( index ) } icon="trash" />
							</Tooltip>
						</div>
					</div>
				) ) }

			<div className="chat-controls">
				<Button variant="secondary" onClick={ () => addMessage( 'user' ) } icon="admin-users">
					{ __( 'Add User Message', 'creator-blocks' ) }
				</Button>
				<Button variant="primary" onClick={ () => addMessage( 'ai' ) } icon="desktop">
					{ __( 'Add AI Response', 'creator-blocks' ) }
				</Button>
			</div>
		</div>
	);
}
