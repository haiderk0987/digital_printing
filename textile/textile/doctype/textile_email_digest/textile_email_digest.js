// Copyright (c) 2023, ParaLogic and contributors
// For license information, please see license.txt

frappe.ui.form.on('Textile Email Digest', {
	addremove_recipients: function(frm) {
		return frappe.call({
			method: "get_users",
			doc: frm.doc,
			callback: function (r) {
				if (r.message && !r.exc) {
					let dialog_html = "";
					for (let user of r.message) {
						dialog_html += `
							<div class="checkbox"><label>
								<input type="checkbox" data-id="${user.name}" ${user.checked ? 'checked' : ''}>
								<span style='${user.enabled ? '' : 'color: red'}'>${user.name} ${user.enabled ? '' : '(Disabled User)'}</span>
							</label></div>
						`;
					}

					let dialog = new frappe.ui.Dialog({
						title: __('Add/Remove Recipients'),
						width: 400,
						primary_action: function() {
							let receiver_list = [];
							for (let input of $(dialog.body).find('input:checked')) {
								receiver_list.push($(input).attr('data-id'));
							}
							frm.set_value('recipient_list', receiver_list.join('\n'));
							dialog.hide();
						},
						primary_action_label: __('Update'),
					});

					$(dialog_html).appendTo(dialog.body);
					dialog.show();
				}
			}
		});
	},
});


