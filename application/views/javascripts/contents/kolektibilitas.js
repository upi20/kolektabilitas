$(function () {
  const nowrap = ($(window).width() > 500) ? 'text-nowrap' : '';
  function dynamic() {
    const table_html = $('#dt_basic');
    table_html.dataTable().fnDestroy()
    const new_table = table_html.DataTable({
      "ajax": {
        "url": "<?= base_url()?>Kolektibilitas/ajax_data/",
        "data": null,
        "type": 'POST'
      },
      "processing": true,
      "serverSide": true,
      "responsive": true,
      "lengthChange": true,
      "autoWidth": true,
      "columns": [
        { "data": null },
        { "data": "nama", className: nowrap },
        {
          "data": "dari", render(data, type, full, meta) {
            return data + ' Hari';
          }
        },
        {
          "data": "sampai", render(data, type, full, meta) {
            return data + ' Hari';
          }
        },
        { "data": "keterangan" },
        { "data": "status_str" },
        {
          "data": "id", render(data, type, full, meta) {
            return `<div class="pull-right">
                <button class="btn btn-primary btn-xs"
                                      data-id="${data}"
                                      data-nama="${full.nama}"
                                      data-no_urut="${full.no_urut}"
                                      data-dari="${full.dari}"
                                      data-sampai="${full.sampai}"
                                      data-status="${full.status}"
                                      data-keterangan="${full.keterangan}"
                                      data-toggle="modal" data-target="#tambahModal"
                                  onclick="Ubah(this)">
                  <i class="fa fa-edit"></i> Ubah
                </button>
                <button class="btn btn-danger btn-xs" onclick="Hapus(${data})">
                  <i class="fa fa-trash"></i> Hapus
                </button>
              </div>`
          }, className: nowrap
        }
      ],
      order: [
        [2, 'asc']
      ],
      columnDefs: [{
        orderable: false,
        targets: [0, 6]
      }],
    });
    new_table.on('draw.dt', function () {
      var PageInfo = table_html.DataTable().page.info();
      new_table.column(0, {
        page: 'current'
      }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1 + PageInfo.start;
      });
    });
  }
  dynamic();

  $("#btn-tambah").click(() => {
    $("#tambahModalTitle").text("Tambah Jenis Koletibilitas");
    $('#id').val('');
    $('#nama').val('');
    $('#no_urut').val('');
    $('#dari').val('');
    $('#sampai').val('');
    $('#status').val('1');
    $('#keterangan').val('');
  });

  $("#fmain").submit(function (ev) {
    ev.preventDefault();
    const form = new FormData(this);
    $.LoadingOverlay("show");
    $.ajax({
      method: 'post',
      url: '<?= base_url() ?>Kolektibilitas/' + ($("#id").val() == "" ? 'insert' : 'update'),
      data: form,
      cache: false,
      contentType: false,
      processData: false,
    }).done((data) => {
      Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      dynamic();
    }).fail(($xhr) => {
      Toast.fire({
        icon: 'error',
        title: 'Data gagal disimpan'
      })
    }).always(() => {
      $.LoadingOverlay("hide");
      $('#tambahModal').modal('toggle')
    })
  });

  $("#fimport").submit(function (ev) {
    ev.preventDefault();
    const form = new FormData(this);
    $.LoadingOverlay("show");
    $.ajax({
      method: 'post',
      url: '<?= base_url() ?>Kolektibilitas/import_excel',
      data: form,
      cache: false,
      contentType: false,
      processData: false,
    }).done((data) => {
      Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      dynamic();
    }).fail(($xhr) => {
      Toast.fire({
        icon: 'error',
        title: 'Data gagal disimpan'
      })
    }).always(() => {
      $.LoadingOverlay("hide");
      $('#inportExcel').modal('toggle')
    })
  });


  // hapus
  $('#OkCheck').click(() => {
    let id = $("#idCheck").val()
    $.LoadingOverlay("show");
    $.ajax({
      method: 'post',
      url: '<?= base_url() ?>Kolektibilitas/delete',
      data: {
        id: id
      }
    }).done((data) => {
      Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      dynamic();
    }).fail(($xhr) => {
      Toast.fire({
        icon: 'error',
        title: 'Data gagal dihapus'
      })
    }).always(() => {
      $('#ModalCheck').modal('toggle')
      $.LoadingOverlay("hide");
    })
  })
})

const view_gambar = (datas) => {
  $("#img-view").attr('src', `<?= base_url() ?>/files/artikel/kategori/${datas.dataset.data}`)
}

// Click Hapus
const Hapus = (id) => {
  $("#idCheck").val(id)
  $("#LabelCheck").text('Form Hapus')
  $("#ContentCheck").text('Apakah anda yakin akan menghapus data ini?')
  $('#ModalCheck').modal('toggle')
}

// Click Ubah
const Ubah = (datas) => {
  const data = datas.dataset;
  $('#id').val(data.id);
  $('#nama').val(data.nama);
  $('#no_urut').val(data.no_urut);
  $('#dari').val(data.dari);
  $('#sampai').val(data.sampai);
  $('#status').val(data.status);
  $('#keterangan').val(data.keterangan);
  $("#tambahModalTitle").text("Ubah Jenis Koletibilitas");
}