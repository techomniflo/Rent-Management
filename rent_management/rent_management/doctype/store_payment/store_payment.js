// Copyright (c) 2022, Gourav Saini and contributors
// For license information, please see license.txt

frappe.ui.form.on('Store Payment', {
	hide_unhide_fields:function(frm){
		cur_frm.set_df_property("mode_of_payment","hidden",0)
		cur_frm.set_df_property("payment_type","hidden",0)
		if (frm.doc.invoices_reference.length){
			cur_frm.set_df_property("paid_from","hidden",0)
			cur_frm.set_df_property("paid_from","reqd",1)
			cur_frm.set_df_property("paid_from_account_currency","hidden",0)
			cur_frm.set_df_property("paid_from_account_currency","reqd",1)
			cur_frm.set_df_property("paid_to","hidden",0)
			cur_frm.set_df_property("paid_to","reqd",1)
			cur_frm.set_df_property("paid_to_account_currency","hidden",0)
			cur_frm.set_df_property("paid_to_account_currency","reqd",1)}
	},
	refresh:function(frm){
		frm.events.hide_unhide_fields(frm)
	},
	after_save: function(frm) {
		frm.events.hide_unhide_fields(frm)
	},
	get_outstanding(frm){
		cur_frm.clear_table("invoices_reference");
		cur_frm.clear_table("rent_reference");
		cur_frm.refresh_field('invoices_reference');
		cur_frm.refresh_field('rent_reference');
		frappe.call({
			doc : frm.doc,
			method : 'fetch_items',
			freeze : true,
			freeze_message : 'Getting All Items'
		}).then((res) => {
				refresh_field('invoices_reference');
				refresh_field('rent_reference');

				
		})
	},
	allocate: function(frm){
		frappe.call({
			doc : frm.doc,
			method : 'allocate_outstanding',
			freeze : true,
			freeze_message : 'Getting All Items'
		}).then((res) => {
				refresh_field('invoices_reference');
				refresh_field('rent_reference');	
		})
	},
	
	on_submit:function(frm){
		cur_frm.set_df_property("get_outstanding","hidden",1)
	}

});