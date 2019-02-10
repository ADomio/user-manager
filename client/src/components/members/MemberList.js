import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import { fetchMembers } from '../../actions';
import moment from 'moment';

class MemberList extends PureComponent {
	componentDidMount() {
		this.props.fetchMembers();
		console.log(process.env.CLOUDINARY_CLOUD_NAME);
	}

	renderMembers() {
		return this.props.members.reverse().map(({ _id, firstName, lastName, email, birthDate, imageUrl }) => {
			return (
				<Fragment key={_id}>
					<div>
						<Fragment>
							<Image
								cloudName={process.env.REACT_APP_CLOUD_NAME}
								publicId={imageUrl}
								width="100"
								crop="scale"
							/>
						</Fragment>
						<h4>
							{firstName} {lastName}
						</h4>
						<p>{email}</p>
						<p>Born: {moment(birthDate).format('MMMM Do, YYYY')}</p>
					</div>
				</Fragment>
			);
		});
	}

	render() {
		return <div>{this.renderMembers()}</div>;
	}
}

function mapStateToProps({ members }) {
	return {
		members
	};
}

export default connect(mapStateToProps, { fetchMembers })(MemberList);