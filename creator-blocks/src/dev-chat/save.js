import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { messages } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div className="creator-block-dev-chat">
				{ messages.map( ( msg, index ) => (
					<div key={ index } className={ `chat-message ${ msg.role }` }>
						<div className="chat-avatar">
							{ msg.role === 'user' ? '👤' : '🤖' }
						</div>
						<div className="chat-bubble">
							<div className="chat-role-label">
								{ msg.role === 'user' ? 'You' : 'AI' }
							</div>
							<RichText.Content
								tagName="div"
								className="chat-content"
								value={ msg.text }
							/>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
